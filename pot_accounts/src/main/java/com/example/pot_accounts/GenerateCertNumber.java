package com.example.pot_accounts;

import java.util.Random;

// 숫자 인증번호 랜덤
public class GenerateCertNumber {
    private int certNumLength = 6;

    public String excuteGenerate() {
        Random random = new Random(System.currentTimeMillis());

        int range = (int)Math.pow(10,certNumLength);
        int trim = (int)Math.pow(10, certNumLength-1);
        int result = random.nextInt(range)+trim;

        if(result>range){
            result = result - trim;
        }

        return String.valueOf(result);
    }

    public int getCertNumLength() {
        return certNumLength;
    }

    public void setCertNumLength(int certNumLength) {
        this.certNumLength = certNumLength;
    }
}
