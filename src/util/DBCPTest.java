package util;

import org.apache.commons.dbcp.BasicDataSource;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.List;

public class DBCPTest {

    public static List<String> query(List<String> list) throws Exception {
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

        String sql = "select * from Score_name ORDER BY score DESC ";

        PreparedStatement ps = conn.prepareStatement(sql);

        ResultSet rs = ps.executeQuery();
        while (rs.next()) {
            String name = rs.getString("name");
            int score = rs.getInt("score");
            if (name == null || name.length() == 0) {
                name = "一位不愿意透露姓名的玩家";
            }
            list.add(name + " " + String.valueOf(score));
        }
        JDBC_Util.close(conn, ps, rs);
        return list;
    }
}
