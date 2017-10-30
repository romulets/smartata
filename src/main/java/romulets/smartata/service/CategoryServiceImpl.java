package romulets.smartata.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import romulets.smartata.exception.EntityAlreadyExistException;
import romulets.smartata.exception.EntityNotFoundException;
import romulets.smartata.model.Category;
import romulets.smartata.repository.CategoryRepository;

@Service("categoryService")
public class CategoryServiceImpl implements CategoryService {

	@Autowired
	private CategoryRepository categoryRepo;
	
	@Override
	public List<Category> findAll() {
		return categoryRepo.findAll();
	}

	@Override
	public List<Category> findByName(String name) {
		if (name == null || name.isEmpty())
		return findAll();
		
		return categoryRepo.findByName(name);
	}

	@Override
	public Category findById(int id) {
		return categoryRepo.findOne(id);
	}

	@Override
	public void create(Category category) {
		if (categoryExists(category.getId()))
			throw new EntityAlreadyExistException("category", new Integer(category.getId()));
		
		categoryRepo.save(category);
		
	}
	
	@Override
	public void update(Category category) {
		if (!categoryExists(category.getId()))
			throw new EntityNotFoundException("category", new Integer(category.getId()));
		
		categoryRepo.save(category);
	}

	@Override
	public void delete(int id) {
		if (!categoryExists(id))
			throw new EntityNotFoundException("category", new Integer(id));
		
		categoryRepo.delete(id);
	}
	
	private boolean categoryExists(int id) {
		Category cat = findById(id);
		return cat != null;
	}
}
