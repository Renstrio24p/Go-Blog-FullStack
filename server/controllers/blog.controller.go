package controller

import (
	database "github.com/Renstrio24p/blog/db"
	model "github.com/Renstrio24p/blog/models"
	"github.com/gofiber/fiber/v2"
)

// Get all Blogs
func GetBlogs(c *fiber.Ctx) error {
	var records []model.Blog
	db := database.DBConnect

	if err := db.Find(&records).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"statusText": "Error",
			"msg":        "Could not retrieve blogs",
			"error":      err.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"statusText":   "Success",
		"msg":          "List of all blogs",
		"blog_records": records,
	})
}

// Create a new Blog
func CreateBlog(c *fiber.Ctx) error {
	record := new(model.Blog)
	db := database.DBConnect

	if err := c.BodyParser(&record); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"statusText": "Bad Request",
			"msg":        "Invalid input",
			"error":      err.Error(),
		})
	}

	if err := db.Create(&record).Error; err != nil {
		return c.Status(400).JSON(fiber.Map{
			"statusText": "Error",
			"msg":        "Could not create blog",
			"error":      err.Error(),
		})
	}

	return c.Status(201).JSON(fiber.Map{
		"statusText": "Success",
		"msg":        "Blog created successfully",
		"data":       record,
	})
}

// Update a Blog
func UpdateBlog(c *fiber.Ctx) error {
	_id := c.Params("id")
	var record model.Blog
	db := database.DBConnect

	if err := db.First(&record, _id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{
			"statusText": "Not Found",
			"msg":        "Blog not found",
			"error":      err.Error(),
		})
	}

	if err := c.BodyParser(&record); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"statusText": "Bad Request",
			"msg":        "Invalid input",
			"error":      err.Error(),
		})
	}

	if err := db.Save(&record).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"statusText": "Error",
			"msg":        "Could not update blog",
			"error":      err.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"statusText": "Success",
		"msg":        "Blog updated successfully",
		"data":       record,
	})
}

// Delete a Blog
func DeleteBlog(c *fiber.Ctx) error {
	_id := c.Params("id")
	var record model.Blog
	db := database.DBConnect

	if err := db.First(&record, _id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{
			"statusText": "Not Found",
			"msg":        "Blog not found",
			"error":      err.Error(),
		})
	}

	if err := db.Delete(&record).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"statusText": "Error",
			"msg":        "Could not delete blog",
			"error":      err.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"statusText": "Success",
		"msg":        "Blog deleted successfully",
	})
}
