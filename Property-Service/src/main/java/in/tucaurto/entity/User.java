package in.tucaurto.entity;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;

import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "users")
@Data
@Entity
@NoArgsConstructor
public class User {

	
	@Id
	private String email;

	private String name;
	private long contactNumber;
	private String gender;
	private String imageUrl;
	private String address;
	private String city;
	private int pincode;
	private String state;
	
	
	
	  @OneToMany(cascade = CascadeType.ALL, mappedBy = "user") 
	  @JsonIgnore
	  private Set<Property> property;
	 
	

}
