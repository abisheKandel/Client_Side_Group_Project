# COM398 Systems Security - Mock Test Preparation Plan

Based on the provided mock test guide, here is a structured preparation plan to help you master the required concepts for your Systems Security exam.

## Phase 1: Cryptography Basics (Ciphers & Hashes)
- **Caesar Cipher & ROT13:** Practice shifting letters mathematically (`(Plaintext + Shift) mod 26`). Remember that ROT13 is a special Caesar cipher with a shift of 13, meaning applying it twice returns the original text. Read questions carefully and encrypt exactly what is written.
- **Vigenère Cipher & Kasiski Examination:** Understand that the Kasiski test is used to find the *length* of the repeating key by finding the common factors of the distances between repeated sequences in the ciphertext.
- **Hashing (SHA-256):** Understand the core properties of cryptographic hashes (Deterministic, Fixed Length, Avalanche Effect, One-Way, Collision Resistance). Hashes provide integrity, not confidentiality.

## Phase 2: Advanced Encryption (One-Time Pad & Block Ciphers)
- **XOR Operations:** Memorize the XOR rules (Same bits = `0`, Different bits = `1`). Practice XORing binary strings.
- **One-Time Pad (OTP):** 
  - *Perfect Secrecy Requirements:* The key must be truly random, secret, used only once, and **exactly the same length as the message**. (If a key is longer or shorter than the message, it is invalid).
  - *Disadvantages:* Key management is extremely difficult (e.g., securely distributing a 1GB key for 1GB of data).
- **Symmetric Encryption Modes:** Learn the differences between ECB, CBC, OFB, and CTR. Specifically, remember that **Output Feedback (OFB)** mode converts a block cipher into a stream cipher and is best suited for stream-oriented transmission over noisy channels (like satellite communication) due to its limited error propagation.

## Phase 3: Applied Security & Malware
- **Digital Signatures:** Know that a digital signature generates a hash of the message and encrypts that hash with the **sender's private key**. This ensures Integrity, Authentication, and Non-Repudiation, but it does *not* automatically provide Confidentiality.
- **Malware Types:** Understand the distinction between a **Trojan Horse** (malicious code hiding within a seemingly harmless program), a Virus (attaches to a file), a Worm (spreads automatically), and Ransomware (encrypts files for ransom).
- **Social Engineering:** Understand Phishing and its variants (Spear Phishing, Whaling, Smishing, Vishing). Remember that phishing primarily aims to steal sensitive information by posing as a trustworthy entity, exploiting human behavior rather than software flaws.

## Actionable Next Steps
1. **Calculate & Practice:** Write down a short binary message and a key of equal length, then XOR them. Try applying a Caesar cipher shift of 3 to a random word.
2. **Review the "Why":** For each multiple-choice topic, ensure you know *why* the incorrect answers are wrong (e.g., knowing why ECB is insecure helps you understand why OFB or CBC is better).
3. **Run a Checksum (Practical Activity):** Download any small open-source file and its SHA-256 checksum, then verify it on your computer to see hashing in practice.
