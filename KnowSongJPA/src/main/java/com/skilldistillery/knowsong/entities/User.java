package com.skilldistillery.knowsong.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Transient;

@Entity
public class User {
	
	
	@Id
	@GeneratedValue(strategy =GenerationType.IDENTITY)
	private int id;
	
	@ManyToOne
	@JoinColumn(name = "rank_id")
	private Rank rank;
	
	private String username;
	
	private String password;
	
	private String role;
	
	private Boolean enabled;
	
	private Boolean admin;
	
	@Column(name = "auth_token")
	private String authToken;
		
	@Column(name = "refresh_token")
	private String refreshToken;
	
	@Column(name = "img_source")
	private String imgSource;
	
	@OneToMany(cascade=CascadeType.ALL)
	@JoinColumn(name="user_id")
	private List<GameHistory> gameHistories;
	
	@Transient
	private GameHistory gameHistory;
	
//	@OneToMany(mappedBy="user")
//	private List <TriviaGame> games;
	
	@ManyToMany
	@JoinTable(name="user_playlist",
	joinColumns=@JoinColumn(name="user_id"),
	inverseJoinColumns=@JoinColumn(name="playlist_id"))
	private List<Playlist> playlists;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Rank getRank() {
		return rank;
	}

	public void setRank(Rank rank) {
		this.rank = rank;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public Boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

	public Boolean getAdmin() {
		return admin;
	}

	public void setAdmin(Boolean admin) {
		this.admin = admin;
	}

	public String getAuthToken() {
		return authToken;
	}

	public void setAuthToken(String authToken) {
		this.authToken = authToken;
	}

	public String getRefreshToken() {
		return refreshToken;
	}

	public void setRefreshToken(String refreshToken) {
		this.refreshToken = refreshToken;
	}

	public String getImgSource() {
		return imgSource;
	}

	public void setImgSource(String imgSource) {
		this.imgSource = imgSource;
	}

	public List<Playlist> getPlaylists() {
		return playlists;
	}

	public void setPlaylists(List<Playlist> playlists) {
		this.playlists = playlists;
	}
	
	public void addGameHistory(GameHistory gh) {
		if(this.gameHistories == null) {
			this.gameHistories = new ArrayList<>();
		}
		
		this.gameHistories.add(gh);
	}

	public GameHistory getGameHistory() {
		return this.gameHistory;
	}

	public void setGameHistory(GameHistory gameHistory) {
		this.gameHistory = gameHistory;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;
		if (id != other.id)
			return false;
		return true;
	}

	public List<GameHistory> getGameHistories() {
		return gameHistories;
	}

	public void setGameHistories(List<GameHistory> gameHistories) {
		this.gameHistories = gameHistories;
	}
	


}
