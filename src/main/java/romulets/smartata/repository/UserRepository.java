package romulets.smartata.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import romulets.smartata.model.User;

@Repository("userRepository")
public interface UserRepository extends JpaRepository<User, Integer> {
	
	User findByEmail(String email);
	
	@Query("SELECT u FROM User u WHERE u.username = :username")
	User findByUsername(@Param("username") String username);
	
}
