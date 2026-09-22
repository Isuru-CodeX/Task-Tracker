package model;

import javax.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="email", nullable=false, unique=true)
    private String email;

    @Column(name="password", nullable=false)
    private String password;

    @Column(name="fname", nullable=false)
    private String fname;

    @Column(name="lname", nullable=false)
    private String lname;

    public User() {}

    public int getId() { return id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getFname() { return fname; }
    public void setFname(String fname) { this.fname = fname; }

    public String getLname() { return lname; }
    public void setLname(String lname) { this.lname = lname; }
}
