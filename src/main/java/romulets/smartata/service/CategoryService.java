package romulets.smartata.service;

import java.util.List;

import romulets.smartata.model.Category;

public interface CategoryService {

	List<Category> findAll();
	
	List<Category> findByName(String name);
	
	Category findById(int id);
	
	void create(Category category);
	
	void update(Category category);
	
	void delete(int id);	
	
}
