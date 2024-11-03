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
	if os.Getenv("ENV") != "production" {
		// Load the .env file if not in production
		err := godotenv.Load(".env")
		if err != nil {
			log.Fatal("Error loading .env file:", err)
		}
	}

	// Use DSN without specifying the database initially
	dsnNoDB := os.Getenv("DSN")

	// Connect without specifying database to check existence or create it
	db, err := gorm.Open(mysql.Open(dsnNoDB), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Error),
	})
	if err != nil {
		panic("Could not connect to the MySQL server")
	}

	// Create the database if it doesn't exist
	db.Exec("CREATE DATABASE IF NOT EXISTS sql12742373")

	fmt.Println("Database created")

	// Now set DSN to include the sql12742373 database

	dsnWithDB := os.Getenv("DSNwithDB")

	// Connect again with the specified database
	db, err = gorm.Open(mysql.Open(dsnWithDB), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Error),
	})
	if err != nil {
		panic("Could not connect to the sql12742373 database")
	}

	fmt.Println("MySQL Database connected")

	// Automigrate models
	db.AutoMigrate(new(model.Blog))

	DBConnect = db
}
