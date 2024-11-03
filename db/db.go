package database

import (
	"fmt"
	"log"
	"os"

	model "github.com/Renstrio24p/blog/models"
	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DBConnect *gorm.DB

func Connect() {
	// Load the .env file if not in production
	if os.Getenv("ENV") != "production" {
		err := godotenv.Load(".env")
		if err != nil {
			log.Fatalf("Error loading .env file: %v", err)
		}
	}

	// Get the DSN from the environment variables
	dsn := os.Getenv("DSNwithDB") // Use DSN with database included
	if dsn == "" {
		log.Fatal("DSNwithDB environment variable is not set")
	}

	// Connect to the database
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Error),
	})
	if err != nil {
		log.Fatalf("Could not connect to the MySQL server: %v", err)
	}

	fmt.Println("MySQL Database connected")

	// Automigrate models
	if err := db.AutoMigrate(new(model.Blog)); err != nil {
		log.Fatalf("Failed to migrate models: %v", err)
	}

	DBConnect = db
}
