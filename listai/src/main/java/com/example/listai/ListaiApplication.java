package com.example.listai;

// import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
// import org.springframework.context.annotation.Bean;

// import com.example.listai.entity.Role;
// import com.example.listai.repository.RoleRepository;

@SpringBootApplication
public class ListaiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ListaiApplication.class, args);
	}

	// @Bean
	// public CommandLineRunner demo(RoleRepository roleRepo) {
	// 	return (args) -> {
	// 		Role role = new Role();
	// 		role.setName("ROLE_ADMIN");
	// 		roleRepo.save(role);
	// 	};
	// }

}
