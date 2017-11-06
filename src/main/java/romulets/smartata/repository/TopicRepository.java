package romulets.smartata.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import romulets.smartata.model.Category;
import romulets.smartata.model.Tag;
import romulets.smartata.model.Topic;
import romulets.smartata.model.User;

@Repository("topicRepository")
public interface TopicRepository extends JpaRepository<Topic, Integer> {
	
	@Query("SELECT t FROM Topic t "
			+ "LEFT JOIN t.category c "
			+ "LEFT JOIN t.tags ta "
			+ "WHERE t.title LIKE %:search% "
			+ "or t.content LIKE %:search% "
			+ "or c.name LIKE %:search% "
			+ "or ta.key LIKE %:search% "
			+ "or ta.name LIKE %:search% ")
	List<Topic> filter(@Param("search") String search);
	
	@Query("SELECT t FROM Topic t WHERE :user in (t.createdBy )")
	List<Topic> createdBy(@Param("user") User user);
	
	@Query("SELECT t FROM Topic t WHERE :user in (t.favoritedBy)")
	Set<Topic> favoritedBy(@Param("user") User user);
	
	@Query("SELECT t FROM Topic t WHERE :tag in (t.tags)")
	List<Topic> taggedWith(@Param("tag") Tag tag);
	
	@Query("SELECT t FROM Topic t WHERE t.category = :category")
	List<Topic> inCategory(@Param("category") Category category);
	
}
