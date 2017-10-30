package romulets.smartata.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import romulets.smartata.model.Category;
import romulets.smartata.service.CategoryService;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

	@Autowired
	private CategoryService categoryService;

	@RequestMapping(method = RequestMethod.GET)
	public List<Category> getAll(@RequestParam(value = "name", required = false) String name) {
		return categoryService.findByName(name);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public Category getOne(@PathVariable("id") int id) {
		return categoryService.findById(id);
	}

	@RequestMapping(method = RequestMethod.POST)
	public void create(@RequestBody Category category) {
		categoryService.create(category);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public void update(@PathVariable("id") int id, @RequestBody Category category) {
		category.setId(id);
		categoryService.update(category);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void delete(@PathVariable("id") int id) {
		categoryService.delete(id);
	}
}
