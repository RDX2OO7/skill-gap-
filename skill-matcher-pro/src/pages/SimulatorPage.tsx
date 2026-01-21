import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  ArrowLeft, ArrowRight, CheckCircle2, XCircle, Lightbulb,
  Target, Trophy, RotateCcw, Sparkles, ChevronRight
} from 'lucide-react';
import { interviewCategories, getQuestionsByCategory, InterviewQuestion } from '@/lib/interviewQuestions';

interface Answer {
  questionId: string;
  answer: string;
  score: number;
  feedback: string;
}

export default function SimulatorPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const questions = selectedCategory ? getQuestionsByCategory(selectedCategory) : [];
  const currentQuestion = questions[currentQuestionIndex];
  const category = interviewCategories.find(c => c.id === selectedCategory);

  const evaluateAnswer = (question: InterviewQuestion, answer: string): { score: number; feedback: string } => {
    if (!answer.trim()) {
      return { score: 0, feedback: 'No answer provided. Try to explain your thought process!' };
    }

    const answerLower = answer.toLowerCase();
    const keywordMatches = question.expectedKeywords?.filter(keyword =>
      answerLower.includes(keyword.toLowerCase())
    ) || [];

    const matchPercentage = question.expectedKeywords
      ? (keywordMatches.length / question.expectedKeywords.length) * 100
      : 50;

    let score = 0;
    let feedback = '';

    if (matchPercentage >= 80) {
      score = 10;
      feedback = '🎯 Excellent! Your answer covers all key points.';
    } else if (matchPercentage >= 60) {
      score = 8;
      feedback = '✅ Good answer! You covered most important points.';
    } else if (matchPercentage >= 40) {
      score = 6;
      feedback = '👍 Decent attempt, but missing some key concepts.';
    } else if (matchPercentage >= 20) {
      score = 4;
      feedback = '⚠️ Partial understanding shown. Review the fundamentals.';
    } else if (answer.length > 20) {
      score = 2;
      feedback = '📝 You tried, but the answer needs more relevant details.';
    } else {
      score = 1;
      feedback = '❌ Answer is too brief or off-topic. Study this concept more.';
    }

    return { score, feedback };
  };

  const handleSubmitAnswer = () => {
    const evaluation = evaluateAnswer(currentQuestion, userAnswer);

    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      answer: userAnswer,
      score: evaluation.score,
      feedback: evaluation.feedback
    };

    setAnswers([...answers, newAnswer]);
    setUserAnswer('');
    setShowHint(false);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleSkip = () => {
    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      answer: '',
      score: 0,
      feedback: 'Question skipped'
    };

    setAnswers([...answers, newAnswer]);
    setUserAnswer('');
    setShowHint(false);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetSimulator = () => {
    setSelectedCategory(null);
    setCurrentQuestionIndex(0);
    setUserAnswer('');
    setAnswers([]);
    setShowResults(false);
    setShowHint(false);
  };

  const getTotalScore = () => {
    return answers.reduce((sum, ans) => sum + ans.score, 0);
  };

  const getMaxScore = () => {
    return questions.length * 10;
  };

  const getPerformanceLevel = (percentage: number) => {
    if (percentage >= 90) return { label: 'Outstanding', color: 'text-purple-500', emoji: '🏆' };
    if (percentage >= 75) return { label: 'Excellent', color: 'text-green-500', emoji: '🌟' };
    if (percentage >= 60) return { label: 'Good', color: 'text-blue-500', emoji: '👍' };
    if (percentage >= 40) return { label: 'Fair', color: 'text-yellow-500', emoji: '📚' };
    return { label: 'Needs Improvement', color: 'text-orange-500', emoji: '💪' };
  };

  // Category Selection View
  if (!selectedCategory) {
    return (
      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-24 pb-12 px-6">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4" />
                Interview Preparation
              </div>
              <h1 className="text-4xl font-bold mb-4">
                Interview <span className="text-gradient">Simulator</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Practice real interview questions across 7 critical categories. Get instant AI-powered feedback on your answers.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {interviewCategories.map((cat, index) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className="p-6 cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-primary group"
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${cat.color} flex items-center justify-center text-2xl mb-4`}>
                      {cat.icon}
                    </div>
                    <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {cat.purpose}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">
                        {getQuestionsByCategory(cat.id).length} Questions
                      </Badge>
                      <ChevronRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button variant="outline" asChild>
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Results View
  if (showResults) {
    const totalScore = getTotalScore();
    const maxScore = getMaxScore();
    const percentage = (totalScore / maxScore) * 100;
    const performance = getPerformanceLevel(percentage);

    return (
      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-24 pb-12 px-6">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center mb-12"
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary to-blue-400 flex items-center justify-center text-4xl mx-auto mb-6">
                {performance.emoji}
              </div>
              <h1 className="text-4xl font-bold mb-2">Interview Complete!</h1>
              <p className="text-muted-foreground mb-6">
                Category: <span className="font-semibold text-foreground">{category?.name}</span>
              </p>

              <div className="bg-card rounded-2xl border border-border p-8 mb-8">
                <div className="flex items-end justify-center gap-2 mb-4">
                  <span className="text-6xl font-bold text-primary">{Math.round(percentage)}%</span>
                </div>
                <p className={`text-xl font-semibold ${performance.color} mb-4`}>
                  {performance.label}
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  You scored {totalScore} out of {maxScore} points
                </p>
                <Progress value={percentage} className="h-3" />
              </div>
            </motion.div>

            {/* Detailed Results */}
            <div className="space-y-4 mb-8">
              <h2 className="text-xl font-bold mb-4">Question Breakdown</h2>
              {questions.map((question, index) => {
                const answer = answers[index];
                return (
                  <Card key={question.id} className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-bold text-muted-foreground">Q{index + 1}</span>
                          <Badge variant={question.difficulty === 'hard' ? 'destructive' : question.difficulty === 'medium' ? 'default' : 'secondary'}>
                            {question.difficulty}
                          </Badge>
                        </div>
                        <p className="font-medium mb-3">{question.question}</p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        {answer.score >= 8 ? (
                          <CheckCircle2 className="w-6 h-6 text-green-500" />
                        ) : answer.score >= 5 ? (
                          <Target className="w-6 h-6 text-yellow-500" />
                        ) : (
                          <XCircle className="w-6 h-6 text-orange-500" />
                        )}
                        <span className="font-bold text-lg">{answer.score}/10</span>
                      </div>
                    </div>

                    {answer.answer && (
                      <div className="bg-muted/50 rounded-lg p-3 mb-3">
                        <p className="text-sm text-muted-foreground mb-1 font-semibold">Your Answer:</p>
                        <p className="text-sm">{answer.answer}</p>
                      </div>
                    )}

                    <div className={`p-3 rounded-lg ${answer.score >= 8 ? 'bg-green-500/10 text-green-700 dark:text-green-400' :
                        answer.score >= 5 ? 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400' :
                          'bg-orange-500/10 text-orange-700 dark:text-orange-400'
                      }`}>
                      <p className="text-sm font-medium">{answer.feedback}</p>
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={resetSimulator}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Try Another Category
              </Button>
              <Button variant="hero" onClick={() => {
                setShowResults(false);
                setCurrentQuestionIndex(0);
                setAnswers([]);
                setUserAnswer('');
              }}>
                <Trophy className="w-4 h-4 mr-2" />
                Retry This Category
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Question View
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-3xl">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" size="sm" onClick={resetSimulator}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Categories
              </Button>
              <Badge variant="outline" className="text-sm">
                Question {currentQuestionIndex + 1} of {questions.length}
              </Badge>
            </div>
            <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className="h-2" />
          </div>

          {/* Category Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl border border-border p-8 mb-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${category?.color} flex items-center justify-center text-3xl`}>
                {category?.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{category?.name}</h2>
                <p className="text-sm text-muted-foreground">{category?.purpose}</p>
              </div>
            </div>

            {/* Question */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant={currentQuestion.difficulty === 'hard' ? 'destructive' : currentQuestion.difficulty === 'medium' ? 'default' : 'secondary'}>
                    {currentQuestion.difficulty}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    Question {currentQuestionIndex + 1}
                  </span>
                </div>
                <h3 className="text-xl font-semibold leading-relaxed">
                  {currentQuestion.question}
                </h3>
              </div>

              {/* Answer Input */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Your Answer</label>
                <Textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Type your answer here... Be specific and explain your reasoning."
                  className="min-h-[200px] resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  {userAnswer.length} characters
                </p>
              </div>

              {/* Hint */}
              <AnimatePresence>
                {showHint && currentQuestion.hint && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-primary/5 border border-primary/10 rounded-lg p-4"
                  >
                    <div className="flex items-start gap-2">
                      <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-primary mb-1">Hint</p>
                        <p className="text-sm text-muted-foreground">{currentQuestion.hint}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowHint(!showHint)}
                  className="text-primary"
                >
                  <Lightbulb className="w-4 h-4 mr-2" />
                  {showHint ? 'Hide' : 'Show'} Hint
                </Button>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={handleSkip}
                  >
                    Skip
                  </Button>
                  <Button
                    variant="hero"
                    onClick={handleSubmitAnswer}
                    disabled={!userAnswer.trim()}
                  >
                    {currentQuestionIndex < questions.length - 1 ? (
                      <>
                        Next Question
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    ) : (
                      <>
                        Finish & See Results
                        <Trophy className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
