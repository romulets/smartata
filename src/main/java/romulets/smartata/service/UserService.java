package romulets.smartata.service;

import java.util.Set;

import org.springframework.security.core.userdetails.UserDetailsService;

import romulets.smartata.model.Topic;
import romulets.smartata.model.User;

public interface UserService extends UserDetailsService {

	public User findById(int id);
	
	public User findByEmail(String email);
	
	public User findByUsername(String username);
	
	public User getLoggedUser();
	
	Set<Topic> findFavoritedTopics();
	
	public void create(User user);
	
	public boolean isFavorited(Topic topic);
	public void favorite(Topic topic);
	public void unfavorite(Topic topic);
	public boolean toogleFavorite(Topic topic);
}
