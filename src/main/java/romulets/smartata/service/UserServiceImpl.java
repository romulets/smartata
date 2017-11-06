package romulets.smartata.service;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import org.hibernate.LazyInitializationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import romulets.smartata.model.Role;
import romulets.smartata.model.Topic;
import romulets.smartata.model.User;
import romulets.smartata.repository.RoleRepository;
import romulets.smartata.repository.TopicRepository;
import romulets.smartata.repository.UserRepository;

@Service("userService")
public class UserServiceImpl implements UserService {

	@Autowired
	private TopicRepository topicRepository;
	
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	private User loggedUser;
	
	@Override
	public User findById(int id) {
		return userRepository.getOne(id);
	}

	@Override
	public User findByEmail(String email) {
		return userRepository.findByEmail(email);
	}
	
	@Override
	public User findByUsername(String username) {
		return userRepository.findByUsername(username);
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = findByUsername(username);
		
		if (user == null)
			throw new UsernameNotFoundException(username);
		
		return new org.springframework.security.core.userdetails.User(
					user.getUsername(), 
					user.getPassword(), 
					Collections.emptyList()
				);
	}
	
	@Override
	public void create(User user) {
		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		user.setActive(1);
		Role userRole = roleRepository.findByRole("ADMIN");
		user.setRoles(new HashSet<Role>(Arrays.asList(userRole)));
		userRepository.save(user);

	}

	@Override
	public User getLoggedUser() {
		if (loggedUser == null) {
			String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			loggedUser = findByUsername(username);	
		}
		
		return loggedUser;
	}
	
	@Override
	public Set<Topic> findFavoritedTopics() {
		User user = getLoggedUser();
		refreshFavoriteTopicsList(user);
		return user.getFavoriteTopics();
	}

	private void refreshFavoriteTopicsList(User user) {
		try {
			user.getFavoriteTopics().size();
		} catch (LazyInitializationException e) {
			user.setFavoriteTopics(topicRepository.favoritedBy(user));	
		}		
	}
	
	@Override
	public boolean isFavorited(Topic topic) {
		User user = getLoggedUser();
		refreshFavoriteTopicsList(user);
		return user.getFavoriteTopics().contains(topic);
	}

	@Override
	public void favorite(Topic topic) {
		User user = getLoggedUser();
		refreshFavoriteTopicsList(user);
		user.getFavoriteTopics().add(topic);
		userRepository.save(user);
	}

	@Override
	public void unfavorite(Topic topic) {
		User user = getLoggedUser();
		refreshFavoriteTopicsList(user);
		user.getFavoriteTopics().remove(topic);
		userRepository.save(user);		
	}

	@Override
	public boolean toogleFavorite(Topic topic) {
		if (isFavorited(topic)) {
			unfavorite(topic);
			return false;
		} else {
			favorite(topic);
			return true;
		}
	}	

}
