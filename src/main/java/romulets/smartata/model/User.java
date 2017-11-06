package romulets.smartata.model;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.data.annotation.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "user")
public class User {

	@Id
	@Column(name = "user_id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	@Column(name = "email", unique = true)
	@Email(message = "*Please provide a valid Email")
	@NotEmpty(message = "*Please provide an email")
	private String email;

	@Column(name = "username", unique = true)
	@NotEmpty(message = "*Please provide an username")
	@Length(min = 3, message = "*Your username must have at least 3 characters")
	private String username;

	@Transient
	@Column(name = "password")
	@Length(min = 5, message = "*Your password must have at least 5 characters")
	@NotEmpty(message = "*Please provide your password")
	private String password;

	@Column(name = "name")
	@NotEmpty(message = "*Please provide your name")
	private String name;

	@Column(name = "last_name")
	@NotEmpty(message = "*Please provide your last name")
	private String lastName;

	@Column(name = "active")
	private int active;

	@JsonIgnore
	@LazyCollection(LazyCollectionOption.TRUE)
	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles;

	@JsonIgnore
	@LazyCollection(LazyCollectionOption.TRUE)
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "favorite_topics", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "topic_id"))
	private Set<Topic> favoriteTopics;

	@JsonIgnore
	@LazyCollection(LazyCollectionOption.TRUE)
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "createdBy", fetch = FetchType.LAZY)
	private Set<Topic> createdTopics;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public int getActive() {
		return active;
	}

	public void setActive(int active) {
		this.active = active;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	public Set<Topic> getFavoriteTopics() {
		return favoriteTopics;
	}

	public void setFavoriteTopics(Set<Topic> favoriteTopics) {
		this.favoriteTopics = favoriteTopics;
	}

	public Set<Topic> getCreatedTopics() {
		return createdTopics;
	}

	public void setCreatedTopics(Set<Topic> createdTopics) {
		this.createdTopics = createdTopics;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}

		if (obj instanceof Topic) {
			User user = (User) obj;
			return this.id == user.id;
		}

		return super.equals(obj);
	}

	@Override
	public int hashCode() {
		return Integer.valueOf(id).hashCode();
	}

}
