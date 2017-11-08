package romulets.smartata.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import romulets.smartata.model.Tag;
import romulets.smartata.repository.TagRepository;

@RestController
@RequestMapping("/api/tags")
public class TagController {

	@Autowired
	private TagRepository tagRepo;
	
	@RequestMapping(value = "/{key}", method = RequestMethod.GET)
	public Tag getOne(@PathVariable("key") String key) {
		return tagRepo.getOne(key);
	}
	
}
