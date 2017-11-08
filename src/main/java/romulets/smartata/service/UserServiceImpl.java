package romulets.smartata.service;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import org.hibernate.Hibernate;
import org.hibernate.LazyInitializationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import romulets.smartata.model.Role;
import romulets.smartata.model.Topic;
import romulets.smartata.model.User;
import romulets.smartata.repository.RoleRepository;
import romulets.smartata.repository.TopicRepository;
import romulets.smartata.repository.UserRepository;

@Transactional
@Service("userService")
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userRepo;

	@Autowired
	private RoleRepository roleRepo;
	
	private TopicRepository topicRepo;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	private User loggedUser;
	
	@Override
	public User findById(int id) {
		return userRepo.getOne(id);
	}

	@Override
	public User findByEmail(String email) {
		return userRepo.findByEmail(email);
	}
	
	@Override
	public User findByUsername(String username) {
		return userRepo.findByUsername(username);
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
		Role userRole = roleRepo.findByRole("ADMIN");
		user.setRoles(new HashSet<Role>(Arrays.asList(userRole)));
		userRepo.save(user);

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

	@Transactional
	private void refreshFavoriteTopicsList(User user) {
		try {
			Hibernate.initialize(user.getFavoriteTopics());	
		} catch (LazyInitializationException e) {
			user.setFavoriteTopics(topicRepo.favoritedBy(user));
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
		userRepo.save(user);
	}

	@Override
	public void unfavorite(Topic topic) {
		User user = getLoggedUser();
		refreshFavoriteTopicsList(user);
		user.getFavoriteTopics().remove(topic);
		userRepo.save(user);		
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
