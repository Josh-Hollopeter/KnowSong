package com.skilldistillery.knowsong.entities;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class User {
	
	
	@Id
//	@GeneratedValue(strategy = generation)
	private int id;
	
	private String username;
	
	

}
