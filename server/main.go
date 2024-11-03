package main

import (
	"log"
	"os"

	database "github.com/Renstrio24p/blog/db"
	router "github.com/Renstrio24p/blog/routers"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
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

	app := fiber.New()

	if os.Getenv("ENV") == "production" {
		app.Use((cors.New(cors.Config{
			AllowOrigins: os.Getenv("CLIENT_URL"),
			AllowHeaders: "Origin, Content-Type, Accept",
		})))
	}

	// Use Fiber's built-in logger middleware
	app.Use(logger.New(logger.Config{
		Format: "[${time}] ${method} ${path} ${status} - ${latency}\n",
	}))

	app.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"message": "Welcome to new Rest API"})
	})

	// Setup routes
	router.SetupRouter(app)

	if os.Getenv("ENV") == "production" {
		app.Static("/", "./client/dist/client")
	}

	log.Fatal(app.Listen(":8080"))
}
