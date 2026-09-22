package dao;

import config.HibernateUtil;
import model.User;
import org.hibernate.Session;

public class UserDAO {

    public User findByEmail(String email) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        User user = session.createQuery("FROM User WHERE email = :e", User.class)
                .setParameter("e", email)
                .uniqueResult();
        session.close();
        return user;
    }

    public void save(User user) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();
        session.save(user);
        session.getTransaction().commit();
        session.close();
    }
}
