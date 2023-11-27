package com.example.listai.controller;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.listai.dto.LoginDto;
import com.example.listai.dto.SignUpDto;
import com.example.listai.entity.Endereco;
import com.example.listai.entity.Role;
import com.example.listai.entity.User;
import com.example.listai.repository.EnderecoRepository;
import com.example.listai.repository.RoleRepository;
import com.example.listai.repository.UserRepository;

@RestController
@RequestMapping("/api")
public class HomeController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private EnderecoRepository enderecoRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @CrossOrigin
    @PostMapping("/login")
    public ResponseEntity<String> authenticateUser(@RequestBody LoginDto loginDto) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        return new ResponseEntity<>("User login successfully!...", HttpStatus.OK);
    }

    @CrossOrigin
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignUpDto signUpDto) {
        // checking for username exists in a database
        if (userRepository.existsByUserName(signUpDto.getUsername())) {
            return new ResponseEntity<>("Username is already exist!", HttpStatus.BAD_REQUEST);
        }

        // checking for email exists in a database
        if (userRepository.existsByEmail(signUpDto.getEmail())) {
            return new ResponseEntity<>("Email is already exist!", HttpStatus.BAD_REQUEST);
        }

        Endereco endereco = new Endereco();
        endereco.setCep(signUpDto.getCep());
        endereco.setCidade(signUpDto.getCidade());
        endereco.setComplemento(signUpDto.getComplemento());
        endereco.setEstado(signUpDto.getEstado());
        endereco.setNumero(signUpDto.getNumero());
        endereco.setRua(signUpDto.getRua());

        Endereco enderecoStored = enderecoRepository.save(endereco);

        // creating user object
        User user = new User();

        user.setName(signUpDto.getName());
        user.setUserName(signUpDto.getUsername());
        user.setEmail(signUpDto.getEmail());
        user.setPassword(passwordEncoder.encode(signUpDto.getPassword()));
        user.setDataNascimento(signUpDto.getDataNascimento());
        user.setEnderecoId(enderecoStored.getId());

        Role roles = roleRepository.findByName("ROLE_ADMIN").get();
        user.setRoles(Collections.singleton(roles));

        userRepository.save(user);

        return new ResponseEntity<>("Usuario salvo!", HttpStatus.OK);
    }
}
