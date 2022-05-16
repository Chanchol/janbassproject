function Encryptrail() {
    plaintextrail = document.getElementById("p").value.toLowerCase().replace(/[^a-z]/g, "");  
    if(plaintextrail.length < 1){ alert("please enter some plaintext"); return; }    
    var key2 = parseInt(document.getElementById("key2").value);
    if(key2 > Math.floor(2*(plaintextrail.length-1))){ alert("key is too large for the plaintext length."); return; }  
    ciphertext = "";
    for(line=0; line<key2-1; line++){
       skip=2*(key2-line-1);   j=0;
        for(i=line; i<plaintextrail.length;){
            ciphertext += plaintextrail.charAt(i);
            if((line==0) || (j%2 == 0)) i+=skip;
           else i+=2*(key2-1) - skip;  
           j++;          
        }
    }
    for(i=line; i<plaintextrail.length; i+=2*(key2-1)) ciphertext += plaintextrail.charAt(i);
    document.getElementById("c2").value = ciphertext;
}

function Decryptrail(f) {
    ciphertext = document.getElementById("c2").value.toLowerCase().replace(/[^a-z]/g, "");  
    if(ciphertext.length < 1){ alert("please enter some ciphertext (letters only)"); return; }    
    var key2 = parseInt(document.getElementById("key2").value);
    if(key2 > Math.floor(2*(ciphertext.length-1))){ alert("please enter 1 - 22."); return; }      
    pt = new Array(ciphertext.length);   k=0;
    for(line=0; line<key2-1; line++){
       skip=2*(key2-line-1);  j=0;
        for(i=line; i<ciphertext.length;){
            pt[i] = ciphertext.charAt(k++);
            if((line==0) || (j%2 == 0)) i+=skip;
           else i+=2*(key2-1) - skip;  
           j++;        
        }
    }
    for(i=line; i<ciphertext.length; i+=2*(key2-1)) pt[i] = ciphertext.charAt(k++);
    document.getElementById("p2").value = pt.join("");
}