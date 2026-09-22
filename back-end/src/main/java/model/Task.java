package model;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "created_date", nullable = false)
    private Date createdDate;

    @Column(name = "users_id", nullable = false)
    private int userId;

    public Task() {}

    public int getId() { return id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Date getCreatedDate() { return createdDate; }
    public void setCreatedDate(Date createdDate) { this.createdDate = createdDate; }

    public int getUserId() { return userId; }
    public void setUserId(int userId) { this.userId = userId; }
}
