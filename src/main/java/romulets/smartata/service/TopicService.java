package romulets.smartata.service;

import java.util.List;

import romulets.smartata.model.Topic;

public interface TopicService {


	List<Topic> findAll();
	
	List<Topic> filter(String search);
	
	List<Topic> findByUser(int id);
	
	List<Topic> findByTag(String key);
	
	List<Topic> findByCategory(int id);
	
	List<Topic> createdByLoggedUser();
	
	Topic findById(int id);
	
	void create(Topic topic);
	
	void update(Topic topic);
	
	void delete(int id);	
	
	boolean toogleFavorite(int id);
	
}
