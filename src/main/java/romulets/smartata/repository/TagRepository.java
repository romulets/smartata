package romulets.smartata.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import romulets.smartata.model.Tag;

@Repository("tagRepository")
public interface TagRepository extends JpaRepository<Tag, String> {

}
