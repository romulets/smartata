package romulets.smartata.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import romulets.smartata.model.Topic;
import romulets.smartata.response.TopicFavoritedResponse;
import romulets.smartata.service.TopicService;
import romulets.smartata.service.UserService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/topics")
public class TopicController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private TopicService topicService;

	@RequestMapping(method = RequestMethod.GET)
	public List<Topic> getAll(@RequestParam(value = "search", required = false) String search) {

		if (search != null) {
			return topicService.filter(search);
		} else {
			return topicService.findAll();
		}
	}

	@RequestMapping(path = "/category/{category}", method = RequestMethod.GET)
	public List<Topic> getInCategory(@PathVariable("category") int category) {
		return topicService.findByCategory(category);
	}
	
	@RequestMapping(path = "/tag/{tag}", method = RequestMethod.GET)
	public List<Topic> getTagged(@PathVariable("tag") String tag) {
		return topicService.findByTag(tag);
	}
	
	@RequestMapping(path = "/favorites", method = RequestMethod.GET)
	public List<Topic> getFavorites() {
		return new ArrayList<>(userService.findFavoritedTopics());
	}
	
	@RequestMapping(value = "/owned", method = RequestMethod.GET)
	public List<Topic> owned() {
		return topicService.createdByLoggedUser();
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public Topic getOne(@PathVariable("id") int id) {
		return topicService.findById(id);
	}

	@RequestMapping(method = RequestMethod.POST)
	public Topic create(@RequestBody Topic topic) {
		topicService.create(topic);
		return topicService.findById(topic.getId());
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public Topic update(@PathVariable("id") int id, @RequestBody Topic topic) {
		topic.setId(id);
		topicService.update(topic);
		return topicService.findById(topic.getId());
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void delete(@PathVariable("id") int id) {
		topicService.delete(id);
	}

	@RequestMapping(value = "/{id}/favorite", method = RequestMethod.POST)
	public TopicFavoritedResponse favorite(@PathVariable("id") int id) {
		boolean isFavorited = topicService.toogleFavorite(id);
		return new TopicFavoritedResponse(isFavorited);
	}

}
