package romulets.smartata.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import romulets.smartata.model.User;
import romulets.smartata.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	private UserService userService;
	
	@RequestMapping(method = RequestMethod.GET)
	public User getLogged() {
		return userService.getLoggedUser();
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public User getOne(@PathVariable("id") int id) {
		return userService.findById(id);
	}

	@RequestMapping(method = RequestMethod.POST)
	public void create(@RequestBody User user) {
		userService.create(user);
	}
	
}
