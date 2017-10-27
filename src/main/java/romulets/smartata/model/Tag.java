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
		this.key = key;
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
}
