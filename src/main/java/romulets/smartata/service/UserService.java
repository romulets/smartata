package romulets.smartata.service;

import romulets.smartata.model.User;

public interface UserService {

	public User findUserByEmail(String email);
	public void saveUser(User user);
	
}
