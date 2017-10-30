package romulets.smartata.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.validator.constraints.NotEmpty;

@Entity
@Table(name = "tag")
public class Tag {

	@Id
	@Column(name = "tag_key")
	private String key;
	
	@Column(name = "name")
	@NotEmpty(message = "*Please provide a tag name")
	private String name;

	public String getKey() {
		return key;
	}

	public void setKey(String key) {		
		this.key = normalizeKey(key);
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		setKey(name);
		
		this.name = name;
	}
	
	private String normalizeKey(String key) {
		key = key.replaceAll("[^a-zA-Z0-9 ]+", "");
		key = key.replaceAll("[ ]+", "-");
		key = key.toLowerCase();
		return key;
	}
	
}
