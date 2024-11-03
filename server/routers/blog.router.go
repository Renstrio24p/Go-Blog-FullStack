package router

import (
	controller "github.com/Renstrio24p/blog/controllers"
	"github.com/gofiber/fiber/v2"
)

func SetupRouter(app *fiber.App) {

	app.Get("/blogs", controller.GetBlogs)
	app.Post("/blogs/create", controller.CreateBlog)
	app.Put("/blogs/update/:id", controller.UpdateBlog)
	app.Delete("/blogs/delete/:id", controller.DeleteBlog)

}
