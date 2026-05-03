"""
Management command to seed the database with initial VoteX data.
"""
from django.core.management.base import BaseCommand
from api.models import FAQEntry, GlossaryTerm, QuizQuestion, ImportantDate
from datetime import date


class Command(BaseCommand):
    help = 'Seed the database with initial VoteX election data'

    def handle(self, *args, **options):
        self.stdout.write('Seeding VoteX database...')
        self.seed_faqs()
        self.seed_glossary()
        self.seed_quiz()
        self.seed_dates()
        self.stdout.write(self.style.SUCCESS('✅ Database seeded successfully!'))

    def seed_faqs(self):
        FAQEntry.objects.all().delete()
        faqs = [
            {
                'question': 'What is the minimum age to vote in India?',
                'answer': 'The minimum age to vote in India is 18 years. Any Indian citizen who is 18 years or older on the qualifying date (January 1st of the year of revision) is eligible to enroll as a voter.',
                'category': 'eligibility'
            },
            {
                'question': 'How do I register to vote?',
                'answer': 'You can register to vote by: (1) Visiting the National Voter Service Portal at voters.eci.gov.in, (2) Filling Form 6 for new registration, (3) Submitting required documents including proof of age, address, and identity, (4) You can also register offline at your nearest Electoral Registration Office (ERO).',
                'category': 'registration'
            },
            {
                'question': 'What documents are needed for voter registration?',
                'answer': 'For voter registration, you need: (1) Proof of Age: Birth certificate, school certificate, passport, or PAN card, (2) Proof of Address: Aadhaar card, utility bills, bank passbook, or rent agreement, (3) Proof of Identity: Aadhaar card, passport, or driving license, (4) Two passport-sized photographs.',
                'category': 'registration'
            },
            {
                'question': 'What is an EVM (Electronic Voting Machine)?',
                'answer': 'An EVM (Electronic Voting Machine) is a simple electronic device used to record votes. It consists of two units: (1) Control Unit: Handled by the Presiding Officer to enable voting, (2) Balloting Unit: Used by voters to cast their vote by pressing the button next to their chosen candidate. EVMs are tamper-proof and have been used in Indian elections since 1999.',
                'category': 'evm'
            },
            {
                'question': 'What is VVPAT?',
                'answer': 'VVPAT (Voter Verifiable Paper Audit Trail) is a system attached to EVMs that provides voters with visual confirmation of their vote. After pressing the button on the EVM, a paper slip with the candidate\'s name and symbol is displayed for 7 seconds behind a transparent window. This slip then falls into a sealed box, creating a paper trail for verification.',
                'category': 'evm'
            },
            {
                'question': 'How do I find my polling booth?',
                'answer': 'You can find your polling booth by: (1) Visiting voters.eci.gov.in and entering your voter details, (2) Using the Voter Helpline App on your smartphone, (3) Calling the national Voter Helpline number 1950, (4) Checking the voter slip/EPIC card you received by mail. Your polling booth is assigned based on your registered address.',
                'category': 'voting'
            },
            {
                'question': 'What ID documents can I use at the polling booth?',
                'answer': 'At the polling booth, you can use: (1) Voter ID Card (EPIC) - the primary document, (2) Aadhaar Card, (3) Passport, (4) Driving License, (5) PAN Card, (6) MNREGA Job Card, (7) Passbook with photograph issued by Bank/Post Office, (8) Smart Card issued by RGI. Any one of these documents is sufficient.',
                'category': 'voting'
            },
            {
                'question': 'Can I vote if I am away from my registered constituency?',
                'answer': 'Generally, you can only vote in the constituency where you are registered. However, if you are a government servant or military personnel, you may be able to vote by postal ballot. For others, you would need to update your voter registration to your new address to vote there.',
                'category': 'voting'
            },
            {
                'question': 'What happens if my name is not on the voter list?',
                'answer': 'If your name is not on the electoral roll at your polling booth, you cannot cast a vote there. You should: (1) Check online at voters.eci.gov.in if your name appears elsewhere, (2) Contact the Booth Level Officer (BLO) or Electoral Registration Officer (ERO), (3) For future elections, register using Form 6 at least 30 days before the voting date.',
                'category': 'voting'
            },
            {
                'question': 'What is the Model Code of Conduct?',
                'answer': 'The Model Code of Conduct (MCC) is a set of guidelines issued by the Election Commission of India that governs political parties and candidates during elections. It comes into force from the date of announcement of elections and remains in effect until the completion of elections. It covers conduct during campaigns, use of government resources, and polling day activities.',
                'category': 'general'
            },
            {
                'question': 'What is a constituency?',
                'answer': 'A constituency (also called an electoral district) is a geographic area that elects a representative to the legislature. India has two types: (1) Lok Sabha Constituencies (Parliamentary): Currently 543 constituencies, each elects one Member of Parliament (MP), (2) Vidhan Sabha Constituencies (Assembly): Present in each state, each elects one Member of Legislative Assembly (MLA).',
                'category': 'general'
            },
            {
                'question': 'How are votes counted?',
                'answer': 'After polling closes, EVMs are sealed and transported to counting centers under security. On counting day: (1) Postal ballots are counted first, (2) EVM votes are counted round by round, (3) Each round counts votes from one or more EVMs, (4) Results are announced after each round, (5) The candidate with the most votes in their constituency wins (First Past the Post system).',
                'category': 'results'
            },
        ]
        for faq in faqs:
            FAQEntry.objects.create(**faq)
        self.stdout.write(f'  ✓ Created {len(faqs)} FAQ entries')

    def seed_glossary(self):
        GlossaryTerm.objects.all().delete()
        terms = [
            {
                'term': 'EVM',
                'definition': 'Electronic Voting Machine — a standalone electronic device used to conduct elections in India. It eliminates the need for ballot papers and reduces electoral fraud.',
                'example': 'Voters press a button on the EVM\'s Balloting Unit to cast their vote for their preferred candidate.',
                'category': 'Technology'
            },
            {
                'term': 'VVPAT',
                'definition': 'Voter Verifiable Paper Audit Trail — a device attached to the EVM that prints a paper slip showing the voter\'s choice, allowing voters to verify their vote was recorded correctly.',
                'example': 'After casting a vote, the VVPAT displays the candidate\'s name and symbol on a slip for 7 seconds.',
                'category': 'Technology'
            },
            {
                'term': 'EC',
                'definition': 'Election Commission of India — an autonomous constitutional authority responsible for administering election processes in India. It conducts free and fair elections to Parliament and State Legislatures.',
                'example': 'The EC announced the election schedule and model code of conduct.',
                'category': 'Institution'
            },
            {
                'term': 'EPIC',
                'definition': 'Electors Photo Identity Card — the official voter identity card issued by the Election Commission of India. It serves as both proof of voter registration and a general photo ID.',
                'example': 'Voters must show their EPIC or other valid ID at the polling booth.',
                'category': 'Documents'
            },
            {
                'term': 'Constituency',
                'definition': 'A geographic area that elects a representative to a legislative body. India has 543 Lok Sabha constituencies and thousands of Vidhan Sabha constituencies.',
                'example': 'Mumbai South is a Lok Sabha constituency that elects one Member of Parliament.',
                'category': 'Structure'
            },
            {
                'term': 'Ballot',
                'definition': 'The method by which voters make their choice in an election. In India, paper ballots have been largely replaced by EVMs, though postal ballots are still paper-based.',
                'example': 'Military personnel stationed away from their constituency can vote by postal ballot.',
                'category': 'Process'
            },
            {
                'term': 'Manifesto',
                'definition': 'A public declaration by a political party outlining their policies, promises, and plans if elected to power.',
                'example': 'The party released its election manifesto promising free healthcare and education reforms.',
                'category': 'Campaigns'
            },
            {
                'term': 'Exit Poll',
                'definition': 'A survey conducted immediately after voters exit polling stations, asking them who they voted for. It is used to predict election results before official counting.',
                'example': 'Exit polls suggested the ruling party would win with a comfortable majority.',
                'category': 'Results'
            },
            {
                'term': 'Booth Level Officer',
                'definition': 'A government official appointed for each polling station who maintains the electoral roll and helps citizens register to vote and update their voter information.',
                'example': 'The BLO visited homes to verify voter details and add new eligible voters to the roll.',
                'category': 'Officials'
            },
            {
                'term': 'Presiding Officer',
                'definition': 'An official in charge of a polling station, responsible for ensuring the smooth and fair conduct of voting. They control the EVM and maintain order at the booth.',
                'example': 'The Presiding Officer enabled the Control Unit to allow the next voter to cast their vote.',
                'category': 'Officials'
            },
            {
                'term': 'Model Code of Conduct',
                'definition': 'A set of guidelines issued by the Election Commission to regulate the behavior of political parties and candidates during elections. It ensures free and fair elections.',
                'example': 'Under MCC, the government cannot announce new schemes or use government vehicles for campaigning.',
                'category': 'Regulations'
            },
            {
                'term': 'Delimitation',
                'definition': 'The process of redrawing the boundaries of electoral constituencies. It is done by the Delimitation Commission to ensure equal representation based on population.',
                'example': 'Delimitation was last conducted in India after the 2001 census.',
                'category': 'Structure'
            },
            {
                'term': 'Affidavit',
                'definition': 'A sworn written statement declaring facts as true. Candidates must file affidavits with the Election Commission disclosing their criminal records, assets, and liabilities.',
                'example': 'The candidate\'s affidavit revealed assets worth several crore rupees.',
                'category': 'Legal'
            },
            {
                'term': 'Returning Officer',
                'definition': 'An official appointed by the Election Commission to oversee the election process in a specific constituency, from accepting nominations to declaring results.',
                'example': 'The Returning Officer declared the winning candidate after all votes were counted.',
                'category': 'Officials'
            },
            {
                'term': 'First Past the Post',
                'definition': 'The electoral system used in India where the candidate with the most votes in a constituency wins, regardless of whether they have an absolute majority.',
                'example': 'A candidate won with 35% of votes in a three-way race using the First Past the Post system.',
                'category': 'System'
            },
        ]
        for term in terms:
            GlossaryTerm.objects.create(**term)
        self.stdout.write(f'  ✓ Created {len(terms)} glossary terms')

    def seed_quiz(self):
        QuizQuestion.objects.all().delete()
        questions = [
            {
                'question': 'What is the minimum age to vote in Indian elections?',
                'options': ['16 years', '18 years', '21 years', '25 years'],
                'correct_answer': '18 years',
                'explanation': 'The Constitution of India (Article 326) grants voting rights to all citizens who are 18 years of age or older. The voting age was lowered from 21 to 18 by the 61st Constitutional Amendment in 1988.',
                'difficulty': 'easy'
            },
            {
                'question': 'What does EVM stand for in Indian elections?',
                'options': ['Electronic Voter Management', 'Electronic Voting Machine', 'Electoral Vote Mechanism', 'Election Verification Module'],
                'correct_answer': 'Electronic Voting Machine',
                'explanation': 'EVM stands for Electronic Voting Machine. It was introduced in Indian elections in 1999 and consists of a Control Unit and a Balloting Unit. EVMs have made the election process faster, more accurate, and environmentally friendly.',
                'difficulty': 'easy'
            },
            {
                'question': 'Which form is used for new voter registration in India?',
                'options': ['Form 1', 'Form 4', 'Form 6', 'Form 8'],
                'correct_answer': 'Form 6',
                'explanation': 'Form 6 is the application form for inclusion of name in the electoral roll for new voters. Form 7 is for deletion of name, Form 8 is for correction of entries, and Form 8A is for transposition of entry.',
                'difficulty': 'medium'
            },
            {
                'question': 'What does VVPAT stand for?',
                'options': ['Verified Voter Paper Audit Trail', 'Voter Verifiable Paper Audit Trail', 'Visual Vote Paper Audit Technology', 'Verified Vote Paper Audit Technology'],
                'correct_answer': 'Voter Verifiable Paper Audit Trail',
                'explanation': 'VVPAT (Voter Verifiable Paper Audit Trail) is a mechanism attached to EVMs that allows voters to verify that their vote was cast correctly. After voting, the machine displays a slip with the candidate\'s name and symbol for 7 seconds.',
                'difficulty': 'medium'
            },
            {
                'question': 'How many seats are there in the Lok Sabha?',
                'options': ['442', '543', '552', '590'],
                'correct_answer': '543',
                'explanation': 'The Lok Sabha (House of the People) has 543 elected seats. Each constituency across India elects one representative. Additionally, the President can nominate 2 members from the Anglo-Indian community, though this practice was discontinued in 2020.',
                'difficulty': 'medium'
            },
            {
                'question': 'Which institution conducts elections in India?',
                'options': ['Supreme Court of India', 'Election Commission of India', 'Ministry of Home Affairs', 'Parliament of India'],
                'correct_answer': 'Election Commission of India',
                'explanation': 'The Election Commission of India (ECI) is an autonomous constitutional authority established under Article 324 of the Indian Constitution. It is responsible for administering election processes for Parliament, state legislatures, and the offices of President and Vice-President.',
                'difficulty': 'easy'
            },
            {
                'question': 'What is the Voter Helpline number in India?',
                'options': ['100', '108', '1950', '1800'],
                'correct_answer': '1950',
                'explanation': '1950 is the National Voter Helpline number in India. Citizens can call this number to get information about voter registration, polling booths, and electoral rolls. The helpline is available in multiple languages.',
                'difficulty': 'hard'
            },
            {
                'question': 'What is a "Booth Level Officer" (BLO)?',
                'options': [
                    'An officer who manages online voting',
                    'A government official maintaining electoral rolls at polling booth level',
                    'An officer who counts votes at the booth',
                    'A security officer posted at the polling booth'
                ],
                'correct_answer': 'A government official maintaining electoral rolls at polling booth level',
                'explanation': 'A Booth Level Officer (BLO) is appointed for each polling station and is responsible for maintaining the electoral roll. They conduct house-to-house surveys, verify voter details, help citizens register to vote, and update voter information.',
                'difficulty': 'hard'
            },
        ]
        for q in questions:
            QuizQuestion.objects.create(**q)
        self.stdout.write(f'  ✓ Created {len(questions)} quiz questions')

    def seed_dates(self):
        ImportantDate.objects.all().delete()
        dates = [
            {
                'event_name': 'Voter Registration Deadline — Phase 1',
                'date': date(2026, 6, 15),
                'description': 'Last date to submit Form 6 for new voter registration for the upcoming state assembly elections.',
                'event_type': 'registration'
            },
            {
                'event_name': 'Election Day — Lok Sabha',
                'date': date(2026, 7, 10),
                'description': 'General Election voting day. All registered voters must visit their designated polling booth between 7 AM and 6 PM.',
                'event_type': 'voting'
            },
            {
                'event_name': 'Result Declaration',
                'date': date(2026, 7, 15),
                'description': 'Official counting of votes and declaration of election results across all constituencies.',
                'event_type': 'results'
            },
            {
                'event_name': 'Voter List Final Publication',
                'date': date(2026, 5, 31),
                'description': 'Final electoral rolls published by Election Commission. Citizens can verify their names at voters.eci.gov.in.',
                'event_type': 'registration'
            },
            {
                'event_name': 'Nomination Filing Deadline',
                'date': date(2026, 6, 20),
                'description': 'Last date for candidates to file their nomination papers with the Returning Officer of their constituency.',
                'event_type': 'general'
            },
        ]
        for d in dates:
            ImportantDate.objects.create(**d)
        self.stdout.write(f'  ✓ Created {len(dates)} important dates')
