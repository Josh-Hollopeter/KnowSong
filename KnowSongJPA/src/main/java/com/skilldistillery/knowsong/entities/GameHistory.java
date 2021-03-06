package com.skilldistillery.knowsong.entities;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
@Entity
@Table(name="game_history")
public class GameHistory {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "num_questions")
	private Integer numQuestions;
	
	private Integer marks;
	
	@Column(name="date_played")
	private LocalDateTime datePlayed;
	
	@Column(name="user_id")
	private Integer userId;
	
	@Column(name="chosen_text")
	private String chosenText;
	
	@Column(name="question_text")
	private String questionText;
	
	@Column(name="answer_text")
	private String answerText;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Integer getNumQuestions() {
		return numQuestions;
	}

	public void setNumQuestions(Integer numQuestions) {
		this.numQuestions = numQuestions;
	}

	public Integer getMarks() {
		return marks;
	}

	public void setMarks(Integer marks) {
		this.marks = marks;
	}

	public LocalDateTime getDatePlayed() {
		return datePlayed;
	}

	public void setDatePlayed(LocalDateTime datePlayed) {
		this.datePlayed = datePlayed;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getChosenText() {
		return chosenText;
	}

	public void setChosenText(String chosenText) {
		this.chosenText = chosenText;
	}

	public String getQuestionText() {
		return questionText;
	}

	public void setQuestionText(String questionText) {
		this.questionText = questionText;
	}

	public String getAnswerText() {
		return answerText;
	}

	public void setAnswerText(String answerText) {
		this.answerText = answerText;
	}

}
