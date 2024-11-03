package database

import (
	"fmt"
	"log"
	"os"

	model "github.com/Renstrio24p/blog/models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DBConnect *gorm.DB

func Connect() {
	// Get the DSN from the environment variables
	dsn := os.Getenv("DSNwithDB") // Use DSN with the database included
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

	fmt.Println("Successfully connected to the MySQL Database")

	// Automigrate models
	if err := db.AutoMigrate(new(model.Blog)); err != nil {
		log.Fatalf("Failed to migrate models: %v", err)
	}

	DBConnect = db
}
