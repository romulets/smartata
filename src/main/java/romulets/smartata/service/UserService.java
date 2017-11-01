package romulets.smartata.service;

import org.springframework.security.core.userdetails.UserDetailsService;

import romulets.smartata.model.User;

public interface UserService extends UserDetailsService {

	public User findById(int id);
	
	public User findByEmail(String email);
	
	public User findByUsername(String username);
	
	public User getLoggedUser();
	
	public void create(User user);
	
}
