package romulets.smartata.service;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import romulets.smartata.exception.EntityAlreadyExistException;
import romulets.smartata.exception.EntityNotFoundException;
import romulets.smartata.exception.SmartataException;
import romulets.smartata.model.Category;
import romulets.smartata.model.Tag;
import romulets.smartata.model.Topic;
import romulets.smartata.model.User;
import romulets.smartata.repository.CategoryRepository;
import romulets.smartata.repository.TagRepository;
import romulets.smartata.repository.TopicRepository;

@Service("topicService")
public class TopicServiceImpl implements TopicService {

	@Autowired
	private TopicRepository topicRepo;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private TagRepository tagRepo;
	
	@Autowired
	private CategoryRepository categoryRepo;
	
	@Override
	public List<Topic> findAll() {
		return topicRepo.findAll();
	}

	@Override
	public List<Topic> filter(String search) {
		return topicRepo.filter(search);
	}

	@Override
	public List<Topic> findByUser(int id) {
		User user = userService.findById(id);
		return topicRepo.createdBy(user);
	}

	@Override
	public List<Topic> createdByLoggedUser() {
		User user = userService.getLoggedUser();
		return topicRepo.createdBy(user);
	}
	
	@Override
	public List<Topic> findByCategory(int id) {
		Category category = categoryRepo.getOne(id);
		return topicRepo.inCategory(category);
	}

	@Override
	public List<Topic> findByTag(String key) {
		Tag tag = tagRepo.getOne(key);
		return topicRepo.taggedWith(tag);
	}
	
	@Override
	public Topic findById(int id) {
		Topic topic = topicRepo.findOne(id);
		
		if (topic != null) {
			boolean isFavorited = userService.isFavorited(topic);
			topic.setFavorited(isFavorited);	
		}		
		
		return topic;
	}

	@Override
	public void create(Topic topic) {
		if (topicExists(topic.getId()))
			throw new EntityAlreadyExistException("topic", new Integer(topic.getId()));
				
		refreshCategory(topic);
		refreshTags(topic);
		topic.setCreatedAt(new Date());
		topic.setCreatedBy(userService.getLoggedUser());		
		topicRepo.save(topic);
	}

	@Override
	public void update(Topic topic) {
		Topic oldTopic = findById(topic.getId());
		
		if (oldTopic == null){
			throw new EntityNotFoundException("topic", new Integer(topic.getId()));
		}			
	
		
		if (!isTopicOwnedByLoggedUser(oldTopic)) {
			throw new SmartataException("Topic not owned by logged user"); 
		}
		
		refreshCategory(topic);
		refreshTags(topic);
		topic.setUpdatedAt(new Date());
		topic.setCreatedBy(oldTopic.getCreatedBy());
		
		topicRepo.save(topic);
	}
	
	private boolean isTopicOwnedByLoggedUser(Topic topic) {
		return topic.getCreatedBy()
				.getUsername()
				.trim()
				.equals(userService.getLoggedUser().getUsername().trim());
	}

	@Override
	public void delete(int id) {
		Topic topic = findById(id);
		
		if (topic == null){
			throw new EntityNotFoundException("topic", new Integer(id));
		}			
		
		topic.setTags(new HashSet<>());
		topic.setFavoritedBy(new HashSet<>());
		topic.setCategory(null);
		topic.setCreatedBy(null);
		topicRepo.save(topic);		
		
		topicRepo.delete(id);
	}
	
	private boolean topicExists(int id) {
		Topic top = findById(id);
		return top != null;
	}
	
	private void refreshCategory(Topic topic) {
		if (topic.getCategory() == null)
			return;
		
		Category cat = categoryRepo.getOne(topic.getCategory().getId());
		topic.setCategory(cat);
	}
	
	private void refreshTags(Topic topic) {
		if (topic.getTags() == null)
			return;
		
		Set<Tag> tags = new HashSet<>();
		
		for (Tag fakeTag : topic.getTags()) {
			Tag tag = tagRepo.findOne(fakeTag.getKey());
			
			if (tag == null) {
				tag = new Tag();
				tag.setName(fakeTag.getName());
			}
			
			tags.add(tag);
		}
		
		topic.setTags(tags);
	}

	@Override
	public boolean toogleFavorite(int id) {
		Topic topic = findById(id);
		return userService.toogleFavorite(topic);
	}

}
