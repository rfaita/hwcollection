package com.hwc.server.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDTO {

    private String uid;
    private String email;

}
