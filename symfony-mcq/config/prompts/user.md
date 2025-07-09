# Rules

Generate multiple-choice questions for Symfony 7 certification preparation, using the structure and constraints defined in the system prompt.

## Topic

Current topic (category) for questions is "{{ $json.topic }}".
You must cover all the associated subtopics: {{ $json.subtopics }}. 

## Constraints

- Generate 50 high-quality unique questions.
- Ensure a mix of concept-based and code-based questions.
