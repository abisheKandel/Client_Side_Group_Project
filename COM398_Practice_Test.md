# COM398 Systems Security - Practice Test

This test is designed to test your knowledge based on the COM398 study plan. Answer the questions first, then check your answers at the bottom of this document.

---

## Questions

**Question 1: One-Time Pad**
You want to encrypt the message `1011` using a One-Time Pad. You have been given the key `11001`. What is the resulting ciphertext?
A) `0111`
B) `1100`
C) The key is invalid.
D) `10111`

**Question 2: Symmetric Encryption Modes**
Which block cipher mode of operation is best suited for streaming data over a noisy channel because a bit error in transmission generally only affects the corresponding decrypted bit?
A) Cipher Block Chaining (CBC)
B) Electronic Codebook (ECB)
C) Output Feedback (OFB)
D) Counter Mode (CTR)

**Question 3: ROT13**
If you apply ROT13 to the word `APPLE`, what is the result?
A) `NCCYR`
B) `NCOYR`
C) `NAAYR`
D) `NCCYP`

**Question 4: Malware**
An employee downloads a free PDF viewer from an unverified website. The program successfully opens PDFs, but quietly installs a keylogger in the background. What type of malware is this?
A) Virus
B) Worm
C) Trojan Horse
D) Ransomware

**Question 5: Digital Signatures**
Which of the following correctly describes how a digital signature is created to ensure message integrity and authenticity?
A) The message is encrypted using the sender's public key.
B) A hash of the message is encrypted using the sender's private key.
C) The message is encrypted using the receiver's public key.
D) A hash of the message is encrypted using the receiver's private key.

**Question 6: Cryptanalysis**
What is the primary purpose of the Kasiski examination?
A) To find the shift value in a Caesar cipher.
B) To calculate the XOR result of two ciphertexts.
C) To determine the length of the repeating keyword in a Vigenère cipher.
D) To reverse a SHA-256 hash.

**Question 7: Hashing**
Which of the following is NOT a property of a secure cryptographic hash function like SHA-256?
A) Deterministic (same input always yields the same output)
B) Collision Resistance (difficult to find two different inputs with the same hash)
C) Reversible (possible to derive the original input from the hash)
D) Avalanche Effect (a tiny change in input drastically changes the output)

**Question 8: Phishing**
An attacker sends a customized, highly targeted email to the Chief Financial Officer (CFO) of a company, pretending to be the CEO requesting an urgent wire transfer. What specific type of social engineering attack is this?
A) Vishing
B) Whaling
C) Smishing
D) Baiting

**Question 9: XOR Operations**
Calculate the result of `1101` XOR `0101`.
A) `1000`
B) `1100`
C) `1001`
D) `0101`

**Question 10: Caesar Cipher**
Encrypt the word `TEST` using a Caesar cipher with a shift of 2.
A) `VGUV`
B) `UFTU`
C) `RCRQ`
D) `WIVW`

---
---

## Answers

**1: C** - The key is invalid because for a One-Time Pad, the key must be exactly the same length as the message (message is 4 bits, key is 5 bits).
**2: C** - Output Feedback (OFB) mode turns a block cipher into a stream cipher and has limited error propagation, making it ideal for noisy channels.
**3: A** - `APPLE` -> A+13=N, P+13=C, P+13=C, L+13=Y, E+13=R -> `NCCYR`.
**4: C** - A Trojan Horse disguises itself as legitimate or harmless software to trick the user into installing it.
**5: B** - A digital signature involves taking a hash of the message and encrypting that hash with the sender's private key.
**6: C** - The Kasiski examination identifies the distance between repeated patterns in ciphertext to deduce the length of the Vigenère cipher key.
**7: C** - Cryptographic hashes are one-way functions; they are mathematically designed so that it is practically impossible to reverse the process and get the original data.
**8: B** - Whaling is a highly targeted form of phishing aimed at senior executives or high-profile targets.
**9: A** - `1 XOR 0 = 1`, `1 XOR 1 = 0`, `0 XOR 0 = 0`, `1 XOR 1 = 0`. Result: `1000`.
**10: A** - T(+2)=V, E(+2)=G, S(+2)=U, T(+2)=V -> `VGUV`.
