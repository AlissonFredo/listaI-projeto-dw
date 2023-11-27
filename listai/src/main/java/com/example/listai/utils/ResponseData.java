package com.example.listai.utils;

public class ResponseData<T> {
    private String message;
    private Class<T> data;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Class<T> getData() {
        return data;
    }

    public void setData(Class<T> data) {
        this.data = data;
    }
}
