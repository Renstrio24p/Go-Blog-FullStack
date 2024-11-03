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
	dsnNoDB := os.Getenv("DSN")
	if dsnNoDB == "" {
		log.Fatal("DSN environment variable is not set")
	}

	// Connect without specifying a database
	db, err := gorm.Open(mysql.Open(dsnNoDB), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Error),
	})
	if err != nil {
		log.Fatalf("Could not connect to the MySQL server: %v", err)
	}

	// Create the database if not in production
	if os.Getenv("ENV") != "production" {
		if err := db.Exec("CREATE DATABASE IF NOT EXISTS sql12742373").Error; err != nil {
			log.Fatalf("Failed to create database: %v", err)
		}
		fmt.Println("Database created")
	}

	// Now set DSN to include the sql12742373 database
	dsnWithDB := os.Getenv("DSNwithDB")
	if dsnWithDB == "" {
		log.Fatal("DSNwithDB environment variable is not set")
	}

	// Connect again with the specified database
	db, err = gorm.Open(mysql.Open(dsnWithDB), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Error),
	})
	if err != nil {
		log.Fatalf("Could not connect to the sql12742373 database: %v", err)
	}

	fmt.Println("MySQL Database connected")

	// Automigrate models
	if err := db.AutoMigrate(new(model.Blog)); err != nil {
		log.Fatalf("Failed to migrate models: %v", err)
	}

	DBConnect = db
}
