package in.tucaurto.entity;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;


import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "property_type")
@Data
@NoArgsConstructor
public class PropertyType {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String type;

	private String description;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "type")
	@JsonManagedReference
	private Set<Property> property;

}
