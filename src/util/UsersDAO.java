package util;

import org.apache.commons.dbcp.BasicDataSource;

import java.sql.Connection;
import java.sql.PreparedStatement;

public class UsersDAO {
    public static void update(String newName, int newScore) throws Exception {
        String url = "jdbc:mysql://localhost/jdbc_dao";
        String user = "root";
        String pwd = "061898";
        String driverName = "com.mysql.jdbc.Driver";

        //创建连接池
        BasicDataSource ds = new BasicDataSource();
        ds.setDriverClassName(driverName);
        ds.setUsername(user);
        ds.setPassword(pwd);
        ds.setUrl(url);

        //获取连接
        Connection conn = ds.getConnection();

        String sql = "INSERT  INTO Score_name(name,score) VALUES (?,?)";
        PreparedStatement ps = conn.prepareStatement(sql);
        ps.setString(1, newName);
        ps.setInt(2, newScore);
        ps.executeUpdate();
        JDBC_Util.close(conn, ps, null);
    }
}

