package romulets.smartata.controller;

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

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/topics")
public class TopicController {

	@Autowired
	private TopicService topicService;

	@RequestMapping(method = RequestMethod.GET)
	public List<Topic> getAll(@RequestParam(value = "search", required = false) String search,
			@RequestParam(value = "user", required = false) Integer user,
			@RequestParam(value = "category", required = false) Integer category,
			@RequestParam(value = "tag", required = false) String tag) {

		if (search != null) {
			return topicService.filter(search);
		} else if (user != null) {
			return topicService.findByUser(user);
		} else if (category != null) {
			return topicService.findByCategory(category);
		} else if (tag != null) {
			return topicService.findByTag(tag);
		} else {
			return topicService.findAll();
		}
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
