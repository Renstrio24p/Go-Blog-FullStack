package main

import (
	"log"
	"os"
	"time"

	database "github.com/Renstrio24p/blog/db"
	router "github.com/Renstrio24p/blog/routers"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

func init() {
	database.Connect()
}

func main() {
	sqlDb, err := database.DBConnect.DB()
	if err != nil {
		log.Fatal("Error in SQL connection: ", err)
	}
	defer sqlDb.Close()

	app := fiber.New(fiber.Config{
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
	})

	// CORS configuration
	if os.Getenv("ENV") == "production" {
		app.Use(cors.New(cors.Config{
			AllowOrigins: os.Getenv("CLIENT_URL"),
			AllowHeaders: "Origin, Content-Type, Accept, Authorization",
		}))
	}

	// Use Fiber's built-in logger middleware
	app.Use(logger.New(logger.Config{
		Format: "[${time}] ${method} ${path} ${status} - ${latency}\n",
	}))

	// Recover from panics and log them
	app.Use(recover.New())

	app.Get("/", func(c *fiber.Ctx) error {
		if os.Getenv("ENV") == "production" {
			app.Static("/", "./dist/client")
		}
		return c.JSON(fiber.Map{"message": "Welcome to the new REST API"})
	})

	// Setup routes
	router.SetupRouter(app)

	// Start the server with a port from the environment variables
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // Default port
	}
	log.Fatal(app.Listen(":" + port))
}
