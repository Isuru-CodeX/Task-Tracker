package dao;

import config.HibernateUtil;
import model.Task;
import org.hibernate.Session;
import org.hibernate.Transaction;

import java.util.List;

public class TaskDAO {

    public void saveTask(Task task) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction tx = session.beginTransaction();
        session.save(task);
        tx.commit();
        session.close();
    }

    public List<Task> getAllTasks() {
        Session session = HibernateUtil.getSessionFactory().openSession();
        List<Task> list = session.createQuery("FROM Task", Task.class).list();
        session.close();
        return list;
    }

    public List<Task> getTasksByUserId(int userId) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        List<Task> list = session.createQuery("FROM Task WHERE userId = :uid", Task.class)
                .setParameter("uid", userId)
                .list();
        session.close();
        return list;
    }

    // ✅ ADD THIS (Fix for UpdateTaskServlet)
    public Task getTaskById(int id) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Task task = session.get(Task.class, id);
        session.close();
        return task;
    }

    public void updateTask(Task task) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction tx = session.beginTransaction();
        session.update(task);
        tx.commit();
        session.close();
    }

    public void deleteTask(int id) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction tx = session.beginTransaction();

        Task task = session.get(Task.class, id);
        if (task != null) session.delete(task);

        tx.commit();
        session.close();
    }
}
