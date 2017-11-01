package romulets.smartata.service;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import romulets.smartata.exception.EntityAlreadyExistException;
import romulets.smartata.exception.EntityNotFoundException;
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
	public List<Topic> findByTag(String key) {
		Tag tag = tagRepo.getOne(key);
		return topicRepo.taggedWith(tag);
	}
	
	@Override
	public List<Topic> findByCategory(int id) {
		Category category = categoryRepo.getOne(id);
		return topicRepo.inCategory(category);
	}

	@Override
	public Topic findById(int id) {
		return topicRepo.findOne(id);
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
		if (topicExists(topic.getId()))
			throw new EntityNotFoundException("topic", new Integer(topic.getId()));
		
		topic.setUpdatedAt(new Date());
		refreshCategory(topic);
		refreshTags(topic);
		
		topicRepo.save(topic);
	}

	@Override
	public void delete(int id) {
		if (topicExists(id))
			throw new EntityNotFoundException("topic", new Integer(id));
		
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

}
