package com.skilldistillery.knowsong.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class User {
	
	
	@Id
//	@GeneratedValue(strategy = generation)
	private int id;
	
	private String username;
	
	private String enabled;
	
	private String role;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEnabled() {
		return enabled;
	}

	public void setEnabled(String enabled) {
		this.enabled = enabled;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
	
//	@Column(name="auth_token")
//	private String authToken;
//	
//	@Column(name="refresh_token")
//	private String refreshToken;
	
	

}
