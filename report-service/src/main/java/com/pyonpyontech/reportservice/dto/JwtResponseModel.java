package com.pyonpyontech.reportservice.dto;

import java.io.Serializable;

public class JwtResponseModel implements Serializable {

	private static final long serialVersionUID = -8091879091924046844L;
	private final String jwtToken;

	public JwtResponseModel(String jwtToken) {
		this.jwtToken = jwtToken;
	}

	public String getToken() {
		return this.jwtToken;
	}
}