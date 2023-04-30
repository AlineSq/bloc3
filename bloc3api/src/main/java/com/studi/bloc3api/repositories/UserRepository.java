package com.studi.bloc3api.repositories;

import com.studi.bloc3api.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {
    @Query("SELECT u FROM User u WHERE u.login = :login")
    List<User> findUsers(@Param("login") String login);
}